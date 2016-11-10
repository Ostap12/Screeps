var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {
        var target = creep.pos.findClosestByPath(_.filter(creep.room.find(FIND_MY_CREEPS), (o) => { return (creep.hits + 90) < creep.hitsMax}));
        if(target) {
            creep.say(target.name);
            if(creep.rangedHeal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            roleBuilder.run(creep);
        }


    }
};
