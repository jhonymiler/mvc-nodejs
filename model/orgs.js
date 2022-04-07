const organisations = [{
        id: 1,
        name: 'BAM Technologies'
    },
    {
        id: 2,
        name: 'Fincludesecure Intl'
    },
    {
        id: 3,
        name: 'Drupal'
    }
];

exports.list = () => organisations;

exports.get = (id) => organisations.find(org => org.id == id);