class Flexirank {
    static decodeString(str, bucketSize = undefined) {
        str = str.toLowerCase();
        let total = 0;
        if (!!bucketSize) {
            str = str.padEnd(bucketSize, 'a');
        }
        for (let index = str.length - 1; index >= 0 ; index--) {
            let letterValue = str.charCodeAt(index) - 'a'.charCodeAt(0);
            if (str.charCodeAt(index) < 97 || str.charCodeAt(index) > 122 ) {
                throw new Error("Invalid character found:", str.charCodeAt(index));
            }
            let basePosition = str.length - 1 - index;
            total += letterValue * Math.pow(26, basePosition);
        }
        return total;
    }

    static encodedString(raWValue, bucketSize = undefined) {
        let encodedResult = '';
        let roundedValue = Math.floor(raWValue);
        while (roundedValue > 0) {
            const charValue = roundedValue % 26; 
            roundedValue = Math.trunc(roundedValue / 26);
            encodedResult = String.fromCharCode(charValue + 97) + encodedResult;
        }
        if (!!bucketSize && bucketSize  > encodedResult.length) {
            encodedResult = encodedResult.padStart(bucketSize, 'a');
        }
        return encodedResult;
    }

    static newRank(options = {})  {
        // Calculate bucketSize to be the length of the longest rank(if bucket size is null or invalid)
        const { bucketSize = null, previousItemRank = 'a', nextItemRank = 'z' } = options;
        let calculatedBucketSize = Math.max(previousItemRank.length, nextItemRank.length);
        if (!!bucketSize  && bucketSize > calculatedBucketSize) {
            calculatedBucketSize = bucketSize;
        }
        let prevValue = 0, nextValue = 0;
        let prev = previousItemRank , next = nextItemRank;
        // Repeat while difference < 4
        while (Math.abs(nextValue - prevValue) < 4) {
            // if difference != 0
            if (nextValue - prevValue !== 0 ) {
                // pad previousItemRank & nextItemRank with 'a'
                prev += 'a';
                next += 'a';        
                // increment bucketSize
                calculatedBucketSize += 1;
            }
                // calculate previousDecodedValue and  nexDecodedValue
                prevValue = Flexirank.decodeString(prev, calculatedBucketSize);
                nextValue = Flexirank.decodeString(next, calculatedBucketSize);
    
            // if differnece is 0, throw exception
            if (nextValue - prevValue === 0) {
                throw new Error("Both previous and next ranks cannot be equal.")
            }
        }
        // newValue is calculated as average of prevValue & nextValue
        let newValue = (prevValue + nextValue) / 2;
        // Return encodedString(newValue)
        return Flexirank.encodedString(newValue, calculatedBucketSize);
    }
}
module.exports = Flexirank;