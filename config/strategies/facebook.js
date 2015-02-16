var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/user.server.controller');

// Create the Facebook strategy configuration method
module.exports = function() {
    
    // Use the Passport's Facebook strategy
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
        
        // Set the user's provider data and include tokens
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        
        // Create the user OAuth profile
        var providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.displayName,

            /*WARNING- known bug if user has not confirmed email, 
            will result in TypeError: undefined... on following 
            email address.  Will look into fixes if it becomes
            a major issue. */
            
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };
        
        // Save the user OAuth profile
        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};