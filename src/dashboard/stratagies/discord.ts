/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import passport from "passport";
import { Strategy } from "passport-discord";
import { config } from "dotenv";
import Users, { User } from "../../data/schemas/Users";
import getMutualGuilds from "../modules/getMutualGuilds";
import CryptoJS from "crypto-js";
config();

passport.serializeUser((user: User, done) => {
  return done(null, user.userId);
});
passport.deserializeUser(async (id, done) => {
  const user = await Users.findOne({ userId: id });
  return user ? done(null, user) : done(null, null);
});

const strat = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        callbackURL: process.env.AUTH_CALLBACK,
        scope: ["identify", "guilds"],
      },
      async function (accessToken, refreshToken, profile, done) {
        let UserData = await Users.findOne({ userId: profile.id });
        if (!UserData) await Users.create({ userId: profile.id });
        const guilds = await getMutualGuilds(profile.guilds, profile.id);
        const cyrpytedToken = CryptoJS.AES.encrypt(
          accessToken,
          process.env.SECRET
        ).toString();
        
        await Users.findOneAndUpdate(
          { userId: profile.id },
          {
            guilds: guilds,
            userExtended: {
              token: cyrpytedToken,
              username: profile.username,
              discriminator: profile.discriminator,
              avatar_url: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=1024`,
            },
          }
        );
        UserData = await Users.findOne({ userId: profile.id });
        return done(null, UserData as User);
      }
    )
  );
};

export default strat;
