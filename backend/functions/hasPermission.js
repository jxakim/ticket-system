const getPermissions = require('./getPermissions');

// Checking if user has permission
async function hasPermission(username, permission) {
    if (username != "") {
        if (permission != "") {
            if ((await getPermissions(username)).includes(permission)) {
                return true;
            } else {
                return false
            }
        }
    }

    return false;
}

// Export the function
module.exports = hasPermission;
