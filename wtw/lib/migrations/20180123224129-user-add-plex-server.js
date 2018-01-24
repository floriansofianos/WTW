'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
            'Users',
            'plexServerId',
            {
                type: Sequelize.INTEGER,
				references: {
					model: "PlexServers",
					key: "id"
				}
            }
        );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
            'Users',
            'plexServerId',
            {
                type: Sequelize.INTEGER,
				references: {
					model: "PlexServers",
					key: "id"
				}
            }
        );
  }
};
