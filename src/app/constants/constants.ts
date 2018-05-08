export const
    ApiBaseUrl = 'http://localhost:50234/api',
    REQUEST_TYPE_GET = 'GET',
    REQUEST_TYPE_POST = 'POST',
    REQUEST_TYPE_PUT = 'PUT',
    REQUEST_TYPE_DELETE = 'DELETE',

    ANIMAL_SEXES = ['M', 'F'],

    FILTERS = [
        {
            name: 'filter.animals.gender',
            displayName: 'Gender',
            options: [
                'M',
                'F'
            ]
        },

        {
            name: 'filter.animals.adoptionStatus',
            displayName: 'Adoption Status',
            options: [
                'Adopted',
                'Not Adopted'
            ]
        },

        {
            name: 'filter.animals.species',
            displayName: 'Species',
            options: [
                'Dog',
                'Cat',
                'Horse'
            ]
        }
    ];
