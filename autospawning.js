require('customCreeps')();
var autospawning = {
    run: function(){

        var minimumNumberOfHarvesters = 2;
        var minimumNumberOfUpgraders = 2;
        var minimumNumberOfBuilders = 1;
        var minimumNumberOfHaulers = 1;
        var minimumNumberOfMiners = 1;
        
        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var numberOfHaulers = _.sum(Game.creeps, (c) => c.memory.role == 'hauler');
        var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');


        var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        var name = undefined;
        
        if (numberOfHarvesters < minimumNumberOfHarvesters) {
            name = Game.spawns['Spawn1'].createCustomCreep(energy, 'harvester');
            
            if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
                // spawn one with what is available
                name = Game.spawns.Spawn1.createCustomCreep(
                    Game.spawns['Spawn1'].room.energyAvailable, 'harvester');
            }
        }
        else if (numberOfUpgraders < minimumNumberOfUpgraders) {
            name = Game.spawns['Spawn1'].createCustomCreep(energy, 'upgrader');
        }
        else if (numberOfBuilders < minimumNumberOfBuilders) {
            name = Game.spawns['Spawn1'].createCustomCreep(energy, 'builder');
        }
        else if (numberOfHaulers < minimumNumberOfHaulers) {
            // try to spawn one
            name = Game.spawns.Spawn1.createHaulerCreep(energy, 'hauler');
        }
        else if (numberOfMiners < minimumNumberOfMiners) {
            // try to spawn one
            name = Game.spawns.Spawn1.createMinerCreep(energy, 'miner');
        }

        else {
            
            name = Game.spawns['Spawn1'].createCustomCreep(energy, 'builder');
        }
        
        if (!(name < 0)) {
            console.log("Spawned new creep: " + name);
        }
    }
    
}

module.exports = autospawning;
