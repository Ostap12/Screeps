var roleBuilder = require('role.builder');

module.exports = {

    run: function(creep) {
        var target = creep.pos.findClosestByPath(creep.room.find(FIND_HOSTILE_CREEPS));
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            roleBuilder.run(creep);
        }


    }


};
