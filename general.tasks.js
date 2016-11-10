var _ = require('lodash');

function findEnergyStorage(creep) {
    var sources = _.filter(creep.room.find(FIND_STRUCTURES),
        (o) => {return o.structureType == STRUCTURE_STORAGE && o.store[RESOURCE_ENERGY] > creep.carryCapacity});
    if(sources.length) {
        creep.memory.source = creep.pos.findClosestByPath(sources).id;
    }
}

function getEnergy(creep) {
    if(creep.memory.source == null) {
        findEnergyStorage(creep);
    }
    var ret = creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY)
    if(ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(creep.memory.source));
    } else if (ret == ERR_INVALID_TARGET) {
        creep.source = null;
    }
}

function deliverEnergy(creep) {
    var towers = _.filter(creep.room.find(FIND_STRUCTURES), (o) => {return (Memory.haul_targets.indexOf(o) < 0) && (o.structureType == STRUCTURE_TOWER && (o.energy < (o.energyCapacity - 300)))})
    if (towers.length > 0) {
        if(creep.memory.target == null) {
            creep.memory.target = creep.pos.findClosestByRange(towers).id;
            Memory.haul_targets.push(creep.memory.target);
        }
        var target = Game.getObjectById(creep.memory.target);
        var ret = creep.transfer(target, RESOURCE_ENERGY)
        if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            Memory.haul_targets = _.without(Memory.haul_targets, creep.memory.target);
            creep.memory.target = null;
        }
        return true;
    }
    var base = _.filter(creep.room.find(FIND_STRUCTURES),
        (structure) => {
            return ( (Memory.haul_targets.indexOf(structure)  < 0) && (
            (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity))
        }
    );
    if(base.length > 0) {
        if(creep.memory.target == null) {
            creep.memory.target = creep.pos.findClosestByRange(base).id;
            Memory.haul_targets.push(creep.memory.target);
        }
        var target = Game.getObjectById(creep.memory.target);
        var ret = creep.transfer(target, RESOURCE_ENERGY)
        if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }else {
            Memory.haul_targets = _.without(Memory.haul_targets, creep.memory.target);
            creep.memory.target = null;
        }
        return true;
    }
    var containers = _.filter(creep.room.find(FIND_STRUCTURES), (o) => { return (Memory.haul_targets.indexOf(o) < 0) && (o.structureType == STRUCTURE_CONTAINER && ((o.store[RESOURCE_ENERGY] + 300) < o.storeCapacity))});
    if (containers.length > 0) {
        if(creep.memory.target == null) {
            creep.memory.target = creep.pos.findClosestByRange(containers).id;
            Memory.haul_targets.push(creep.memory.target);
        }
        var target = Game.getObjectById(creep.memory.target);
        var ret = creep.transfer(target, RESOURCE_ENERGY)
        if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }else {
            Memory.haul_targets = _.without(Memory.haul_targets, creep.memory.target);
            creep.memory.target = null;
        }
        return true;
    }
    return false;
}


function isFull(creep) {
    if(creep.carry.energy == creep.carryCapacity) return true;
    return false;
}

module.exports = {
    findEnergyStorage: findEnergyStorage,
    getEnergy: getEnergy,
    deliverEnergy: deliverEnergy,
    isFull: isFull,
};