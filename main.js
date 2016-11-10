require('customCreeps')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var autospawning = require('autospawning');
var roleArcher = require('role.archer');
var roleHealer = require('role.healer');
var roleHauler = require('role.hauler');
var roleMiner = require('role.miner');


module.exports.loop = function () {

    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    roleDefender.run();

    for(var name in Game.rooms){
        roleDefender.run(name);
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }

        /*       else if (creep.memory.role == 'melee') {
         roleWMelee.run(creep);
         }
         else if (creep.memory.role == 'archer') {
         roleArcher.run(creep);
         }
         else if (creep.memory.role == 'healer') {
         roleHealer.run(creep);
         }
         */
        
    }
    autospawning.run();
}
