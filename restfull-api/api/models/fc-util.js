exports.formatOutput = (list, req) => {

    if(typeof(list) != 'object' || typeof(req) != 'object' ){
        return {};
    }

    return {
        count: list.length,
        tiers: list.map(lis => {
            return {
                id: lis.id,
                tier: lis.tier,
                childrens: [
                    lis.children0,
                    lis.children1,
                    lis.children2,
                    lis.children3,
                    lis.children4,
                    lis.children5
                ],
                request: {
                    type: 'GET',
                    url: 'http://' + req.headers.host + '/unmarried/' + lis.id
                },
                updateAt: list.updateAt
            }
        })
    }
}

exports.formatOneOutput = (doc) => {
    return {
        id: doc.id,
        tier: doc.tier,
        childrens: [
            doc.children0,
            doc.children1,
            doc.children2,
            doc.children3,
            doc.children4,
            doc.children5
        ],
        updateAt: doc.updateAt
    }
}