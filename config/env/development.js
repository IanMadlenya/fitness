/*

During app development, you will often need to configure
third-party modules to run differently in various environments.

You can manage a set of environment configuration files third-party
holds these properties.  You can then use the process.env.NODE_ENV
environment variable to determine which config file to load.

*/

module.exports = {
	sessionSecret : 'developmentSecretSession'
};