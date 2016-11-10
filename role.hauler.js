var helper = require('general.tasks');
var _ = require('lodash');

module.exports = {
    run: function(creep) {
        if(creep.memory.status == 'delivering' && creep.carry.energy > 0) {
            if(!helper.deliverEnergy(creep)) {
                creep.memory.status = 'gathering';
            }

        } else {
            creep.memory.status = 'gathering'
            helper.getEnergy(creep);
            if(helper.isFull(creep)) {
                creep.memory.status = 'delivering';
            }
        }
    }
};
