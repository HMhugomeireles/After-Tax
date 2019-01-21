const Util = require('../../models/fc-util');

const fakeList = [{
        _id: "5c33dc72bca35a3fd45a74cf",
        tier: "342",
        children0: "0",
        children1: "1",
        children2: "2",
        children3: "3",
        children4: "4",
        children5: "5",
        updateAt: "2019-01-07T23:10:42.983+00:00"
    },
    {
        _id: "5c33dc72bca35a3fd45a74cf",
        tier: "342",
        children0: "0",
        children1: "1",
        children2: "2",
        children3: "3",
        children4: "4",
        children5: "5",
        updateAt: "2019-01-07T23:10:42.983+00:00"
    },
]

const fakeReq = {
    headers: {
        host: "localhost:8080"
    }
}

const fakeListFormat = Util.formatOutput(fakeList, fakeReq);


describe('Util functions to format output.', () => {
    test('Verify type of paramers.', () => {
        expect(Util.formatOutput(undefined, undefined)).toEqual({});
    });

    test('Formating is valid.', () => {
        expect(Util.formatOutput(fakeList, fakeReq)).not.toBe(fakeList);
        //expect(Util.formatOutput(fakeList, fakeReq)).toMatch(fakeListFormat);
    });

});