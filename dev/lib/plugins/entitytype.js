ig.module(
    'plugins.entitytype'
).requires(
    'impact.entity'
).defines(function() {
 
ig.Entity.TYPE._next = 4;
 
ig.Entity.TYPE.get = function(name) {
    if( name.indexOf(" ") != -1 ) {
        type = 0;
        types = name.split(' ');
        for( i = 0; i < types.length; i++ ) {
            type |= ig.Entity.TYPE.get(types[i]);
        }
 
        return type;
    }
 
    if(!ig.Entity.TYPE.hasOwnProperty(name) ) {
        ig.Entity.TYPE[name] = ig.Entity.TYPE._next;
        ig.Entity.TYPE._next <<= 1;
    }
 
    return ig.Entity.TYPE[name];
}
 
})