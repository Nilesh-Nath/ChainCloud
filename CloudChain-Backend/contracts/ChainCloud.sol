//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Errors
error ChainCloud__EmptyURL();

contract ChainCloud {
    /**
     * @title ChainCloud
     * @author Nilesh Nath
     * description : It helps in storing the url of the data to the blockchain
     *               and grant and revoke permission of your data over other
     *               users and get those data only by the owner of the data and
     *               those users with the permission over the data .
     */
    /**
     * @dev Struct for storing / tracking whome owner of the data gave perms to access them
     */

    struct Access {
        address user;
        bool access;
    }
    // State Variables
    // Mappings
    mapping(address => string[]) private s_data;
    mapping(address => Access[]) private s_accessList;
    mapping(address => mapping(address => bool)) private s_ownership;
    mapping(address => mapping(address => bool)) private s_previousState;

    // Events
    event PermsGranted(address indexed user, bool indexed perm);
    event PermsRevoked(address indexed user, bool indexed perm);

    /**
     * description : Stores the url of the user's data to a dynamic array of string (url)
     * @param _url It is the url of the data you want to store.
     */

    function upload(string memory _url) external {
        if (bytes(_url).length <= 0) {
            revert ChainCloud__EmptyURL();
        }
        s_data[msg.sender].push(_url);
    }

    /**
     * description : Checks the structure (array) to find if the address is already
     *      available in the array and if yes enables it's access to true if not then push
     *      the user to array with perms true
     * @param _user Address of the user whome you want to give permission
     */

    function permsAllow(address _user) external {
        s_ownership[msg.sender][_user] = true;
        if (s_previousState[msg.sender][_user]) {
            for (uint256 i = 0; i < s_accessList[msg.sender].length; i++) {
                if (s_accessList[msg.sender][i].user == _user) {
                    s_accessList[msg.sender][i].access = true;
                }
            }
        } else {
            s_accessList[msg.sender].push(Access(_user, true));
            s_previousState[msg.sender][_user] = true;
        }
        emit PermsGranted(_user, true);
    }

    /**
     *description : Checks the strcuture (array) to find the user and sets it's 
                    perms to false.
     * @param _user Address if user whose permission you want to revoke
     */
    function permsRevoke(address _user) external {
        s_ownership[msg.sender][_user] = false;
        for (uint256 i = 0; i < s_accessList[msg.sender].length; i++) {
            if (s_accessList[msg.sender][i].user == _user) {
                s_accessList[msg.sender][i].access = false;
            }
        }
        emit PermsRevoked(_user, false);
    }

    /**
     * description : Access the stored data
     * @param _owner address of user whose data is to be displayed
     */

    function displayData(address _owner) public view returns (string[] memory) {
        require(
            _owner == msg.sender || s_ownership[_owner][msg.sender],
            "Sorry!You Don't Have Permission to Access Data :( !"
        );
        return s_data[_owner];
    }

    /**
     * description : Show all the addresses with permission over your data!
     */
    function showAccess() public view returns (Access[] memory) {
        return s_accessList[msg.sender];
    }
}
