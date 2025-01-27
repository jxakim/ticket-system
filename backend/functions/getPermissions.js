const User = require('../../models/User');
const Group = require('../../models/Group');

// Get user permissions
async function getPermissions(username) {
    let permissions = [];
    if (username != "") {
        const user = await User.findOne({ username: username });
        const user_group = user.group;
        const group = await Group.findOne({ name: user_group });
        permissions = (group.permissions).split(",");
    }

    return permissions;
}

// Export the function
module.exports = getPermissions;
