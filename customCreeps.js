module.exports = function() {

    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {

            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            
            return this.createCreep(body, undefined, { role: roleName});
        };
    StructureSpawn.prototype.createHaulerCreep =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 150);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY, CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName});

        };


    StructureSpawn.prototype.createMinerCreep =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 250);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK, WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName});

        };
};
