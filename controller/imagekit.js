const ImageKit = require('imagekit')

const privateKey = "private_aaCdEQaDC8kj1gIDzJsxxgnWeFE="

const imageKit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/uhtx1amtt',
    publicKey: 'public_k0o7zbOkiFy8QSCxNMDgntAvLxg=',
    privateKey: 'private_aaCdEQaDC8kj1gIDzJsxxgnWeFE='
});

const authentication = () => {
    const authenticationResult = imageKit.getAuthenticationParameters();
    return authenticationResult;
}

module.exports = {authentication}