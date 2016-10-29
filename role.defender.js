var roleDefender = {


    run: function () {
        for (var key in Game.rooms) {
            var roomName = Game.rooms[key].name;
            var towers = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_TOWER
            });
            for (let tower of towers) {
                var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (target != undefined) {
                    tower.attack(target);
                }
            }
            // if(tower) {
            //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            //         filter: (structure) => structure.hits < structure.hitsMax
            //     });
            //     if(closestDamagedStructure) {
            //         tower.repair(closestDamagedStructure);
            //     }
            //
            //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            //     if(closestHostile) {
            //         tower.attack(closestHostile);
            //     }
            // }

        }
    }

};
module.exports = roleDefender;

