let data = [{
        id: 1,
        string: 'hari senin',
        integer: '100',
        float: '1.01',
        date: '2020-02-03',
        boolean: 'false'
    },
    {
        id: 2,
        string: 'hari selasa',
        integer: '200',
        float: '1.02',
        date: '2020-02-04',
        boolean: 'true'
    },
    {
        id: 3,
        string: 'hari rabu',
        integer: '300',
        float: '1.03',
        date: '2020-02-05',
        boolean: 'false'
    },
    {
        id: 4,
        string: 'hari kamis',
        integer: '400',
        float: '1.04',
        date: '2020-02-06',
        boolean: 'Choose the Boolean'
    }
]

for (let i = 0; i < data.length; i++) {
    if (data[i].id === 3) {
        data[i].string = 'wednesday'
    }
}

console.log(data)