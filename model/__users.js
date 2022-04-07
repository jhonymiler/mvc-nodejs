const db = require( '../db' );

const users = [ {
        id: 1,
        name: 'John',
        email: 'AAAA',
        address: 'BBBB',
        phone: 'CCCC'
    },
    {
        id: 2,
        name: 'DADADA',
        email: 'FFF',
        address: 'HHH',
        phone: '0909'
    },
    {
        id: 3,
        name: 'FAFAF',
        email: 'GGG',
        address: 'AAAA',
        phone: '09088'
    },
];

exports.list = async () => {
    const {
        rows
    } = await db.query( 'SELECT * FROM user' );
    return rows;
}

exports.view = async ( id ) => {
    // return users.find(e => e.id == id); // NOTE: WE forgot to add return.

    const {
        rows
    } = await db.query( 'SELECT * FROM user WHERE id = $1', [ id ] );
    return rows.length ? rows[ 0 ] : null;
};