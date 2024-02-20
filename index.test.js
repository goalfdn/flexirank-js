const Flexirank = require('./index.js');

describe('decodeString Tests', () => {
    test('decodeString with "a" returns 0', () => {
        expect(Flexirank.decodeString('a')).toBe(0);
    });

    test('decodeString with "A" returns 0', () => {
        expect(Flexirank.decodeString('A')).toBe(0);
    });

    test('decodeString with "M" returns 12', () => {
        expect(Flexirank.decodeString('M')).toBe(12);
    });

    test('decodeString with "m" returns 12', () => {
        expect(Flexirank.decodeString('m')).toBe(12);
    });

    test('decodeString with "z" returns 25', () => {
        expect(Flexirank.decodeString('z')).toBe(25);
    });

    test('decodeString with "Z" returns 25', () => {
        expect(Flexirank.decodeString('Z')).toBe(25);
    });

    test('decodeString with "sj" returns 477', () => {
        expect(Flexirank.decodeString('sj')).toBe(477);
    });

    test('decodeString with "bn" returns 39', () => {
        expect(Flexirank.decodeString('bn')).toBe(39);
    });

    test('decodeString with "dtx" returns 2545', () => {
        expect(Flexirank.decodeString('dtx')).toBe(2545);
    });

    test('decodeString with "mke" returns 8376', () => {
        expect(Flexirank.decodeString('mke')).toBe(8376);
    });

    test('decodeString with "cyli" returns 51670', () => {
        expect(Flexirank.decodeString('cyli')).toBe(51670);
    });

    test('decodeString with "fqv" with a bucketSize of 4  returns 99242', () => {
        expect(Flexirank.decodeString('fqv', 4)).toBe(99242);
    });

    test('decodeString with "awpoh"  returns 397183', () => {
        expect(Flexirank.decodeString('awpoh')).toBe(397183);
    });

    test('decodeString with "grauz"  returns 3041193', () => {
        expect(Flexirank.decodeString('grauz')).toBe(3041193);
    });

    test('decodeString with "grauz" with a bucketSize of 6 returns 297034400', () => {
        expect(Flexirank.decodeString('z', 6)).toBe(297034400);
    });

    test('decodeString with "aaaaaz"  returns 25', () => {
        expect(Flexirank.decodeString('aaaaaz')).toBe(25);
    });

    test('decodeString with "nuroverse"  returns 2880815629228', () => {
        expect(Flexirank.decodeString('nuroverse')).toBe(2880815629228);
    });

    test('decodeString with "4" throws Error', () => {
        const invalidString = '4';
        const callWithInvalidChar = () => Flexirank.decodeString(invalidString);
        expect(callWithInvalidChar).toThrow("Invalid character found:");
    });
});

describe('encodedString Tests', () => {
    test('encodedString with 0 and bucketSize of 1 returns "a"', () => {
        expect(Flexirank.encodedString(0,1)).toBe('a');
    });

    test('encodedString with 12  returns "m"', () => {
        expect(Flexirank.encodedString(12)).toBe('m');
    });

    test('encodedString with 25 returns "z"', () => {
        expect(Flexirank.encodedString(25)).toBe('z');
    });

    test('encodedString with 13.5 returns "n"', () => {
        expect(Flexirank.encodedString(13.5)).toBe('n');
    });

    test('encodedString with 477 returns "sj"', () => {
        expect(Flexirank.encodedString(477)).toBe('sj');
    });

    test('encodedString with 39 returns "bn"', () => {
        expect(Flexirank.encodedString(39)).toBe('bn');
    });

    test('encodedString with 2545 returns "dtx"', () => {
        expect(Flexirank.encodedString(2545)).toBe('dtx');
    });

    test('encodedString with 8376 returns "mke"', () => {
        expect(Flexirank.encodedString(8376)).toBe('mke');
    });

    test('encodedString with 51670 returns "cyli"', () => {
        expect(Flexirank.encodedString(51670)).toBe('cyli');
    });

    test('encodedString with 99242 returns "fqva"', () => {
        expect(Flexirank.encodedString(99242)).toBe('fqva');
    });

    test('encodedString with 397183 with a bucketSize of 5 returns "awpoh"', () => {
        expect(Flexirank.encodedString(397183,5)).toBe('awpoh');
    });

    test('encodedString with 3041193 returns "grauz"', () => {
        expect(Flexirank.encodedString(3041193)).toBe('grauz');
    });

    test('encodedString with 297034400 returns "zaaaaa"', () => {
        expect(Flexirank.encodedString(297034400)).toBe('zaaaaa');
    });

    test('encodedString with 25 with a bucketSize of 6  returns "aaaaaz"', () => {
        expect(Flexirank.encodedString(25,6)).toBe('aaaaaz');
    });

    test('encodedString with 2880815629228  returns "nuroverse"', () => {
        expect(Flexirank.encodedString(2880815629228)).toBe('nuroverse');
    });
});

describe('newRank Tests', () => {
    test('newRank between "a" and "z" returns "m"', () => {
        expect(Flexirank.newRank()).toBe('m');
    });

    test('newRank between "m" and "z" returns "s"', () => {
        expect(Flexirank.newRank({previousItemRank: 'm'})).toBe('s');
    });

    test('newRank between "s" and "z" returns "v"', () => {
        expect(Flexirank.newRank({previousItemRank: 's'})).toBe('v');
    });

    test('newRank between "v" and "z" returns "x"', () => {
        expect(Flexirank.newRank({previousItemRank: 'v'})).toBe('x');
    });

    test('newRank between "x" and "z" returns "ya"', () => {
        expect(Flexirank.newRank({previousItemRank: 'x'})).toBe('ya');
    });

    test('newRank between "ya" and "z" returns "yn"', () => {
        expect(Flexirank.newRank({previousItemRank: 'ya'})).toBe('yn');
    });

    test('newRank between "a" and "m" returns "g"', () => {
        expect(Flexirank.newRank({nextItemRank: 'm'})).toBe('g');
    });

    test('newRank between "a" and "g" returns "d"', () => {
        expect(Flexirank.newRank({nextItemRank: 'g'})).toBe('d');
    });

    test('newRank between "a" and "d" returns "bn"', () => {
        expect(Flexirank.newRank({nextItemRank: 'd'})).toBe('bn');
    });

    test('newRank between "a" and "bn" returns "at"', () => {
        expect(Flexirank.newRank({nextItemRank: 'bn'})).toBe('at');
    });

    test('newRank between "at" and "bn" returns "bd"', () => {
        expect(Flexirank.newRank({previousItemRank: 'at', nextItemRank: 'bn'})).toBe('bd');
    });

    test('newRank between "bd" and "bn" returns "bi"', () => {
        expect(Flexirank.newRank({previousItemRank: 'bd', nextItemRank: 'bn'})).toBe('bi');
    });

    test('newRank between "bi" and "bn" returns "bk"', () => {
        expect(Flexirank.newRank({previousItemRank: 'bi', nextItemRank: 'bn'})).toBe('bk');
    });

    test('newRank between "bk" and "bn" returns "bln"', () => {
        expect(Flexirank.newRank({previousItemRank: 'bk', nextItemRank: 'bn'})).toBe('bln');
    });

    test('newRank between "e" and "fkeo" returns "esch"', () => {
        expect(Flexirank.newRank({previousItemRank: 'e', nextItemRank: 'fkeo'})).toBe('esch');
    });

    test('newRank between "e" and "x" and a bucketSize of 3 returns "nna"', () => {
        expect(Flexirank.newRank({previousItemRank: 'e', nextItemRank: 'x', bucketSize: 3})).toBe('nna');
    });
});