import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    rejectOnNotFound: {
        findFirst: {
            User: (err) => new Error(`User: ${err}`),
        },
        findMany: {
            User: (err) => new Error(`Users: ${err}`),
        },
    },
    errorFormat: 'minimal',
})

for (var a = [], i = 0; i < 40; ++i) a[i] = i;


/**
 * It takes an array and returns a shuffled version of that array
 * @param array - The array to shuffle.
 * @returns The array is being shuffled.
 */
function shuffle(array) {
    let tmp, current, top = array.length;
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

a = shuffle(a);


/* It's creating an array of 40 users with random data. */
const users = a.map(
    (id) => ({
        pseudo: `${id}`,
        email: `${id}@gmail.com`,
        password: "azer",
        firstname: `${id}`,
        lastname: `${id}`,
        // sex: `(Math.random()>0.5 ? 'MAN' : 'WOMAN'`,
        latitude: (Math.random() > 0.5 ?
            48.82558263128961 + (Math.random() / 100)
            :
            48.82558263128961 - (Math.random() / 100)),
        longitude: (Math.random() > 0.5 ?
            2.335827558647471 + (Math.random() / 100)
            :
            2.335827558647471 - (Math.random() / 100)),
        age: id,
        description: "J'aime les fraises",
        nationality: "France",
        // kindOfTrip: "BIKE",
        isVisibled: true
    })
)
console.log(users)


const main = async () => {
    const response = await Promise.all(users.map((user) => prisma.user.create({
            data: user
        })
    ))
    console.log(response)
}

main()
