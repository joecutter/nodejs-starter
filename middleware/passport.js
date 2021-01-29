const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const FacebookStrategy = require('passport-facebook').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { Logger } = require("../helpers");
const logger = Logger.getLogger("PassportMiddleware");
const { UserRepo } = require("../query");
const { userScript } = require("../scripts");
const config = require(__dirname + "./../config." + process.env.NODE_ENV);

/** LOGIN AUTH */
passport.use(
  "Login",
  new LocalStrategy(
    {
      usernameField: "phoneNumber",
      passwordField: "password",
    },
    async (phoneNumber, password, done) => {
      logger.debug("here..");
      try {
        const existingUser = await UserRepo.findByPhoneNumber(phoneNumber);
        logger.debug("ExistingUser ", existingUser);
        if (existingUser.length === 0) {
          logger.error("User doesn't Exist");
          return done(null, false, { message: "User Account does not exists" });
        }

        if (!userScript.validatePassword(existingUser[0].password, password)) {
          logger.error("Password Validation Failed");
          return done(null, false, { message: "Validate Password Failed" });
        }

        logger.debug("Password Validation Passed");

        return done(null, existingUser, {
          message: "Validate Password Passed",
        });
      } catch (error) {
        return done(error, false, { message: error });
      }
    }
  )
);

/** JWT */
passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.SECURITY.SECRET_KEY,
    },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done("jwt expired");
      }

      return done(null, jwtPayload);
    }
  )
);

/** FACEBOOK */
passport.use(
  new FacebookStrategy(
    {
      clientID: `${config.FACEBOOK.CLIENT_ID}`,
      clientSecret: `${config.FACEBOOK.CLIENT_SECRET}`,
      callbackURL: `http://${config.APP.HOST}:${config.APP.PORT}${config.APP.VERSION}/auth/facebook/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
