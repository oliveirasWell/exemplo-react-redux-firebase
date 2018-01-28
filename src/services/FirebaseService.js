import {firebaseAuth, firebaseDatabase} from '../utils/firebase'

export class FirebaseService {
    static getAllLeituras = (callback, size) => {
        firebaseDatabase.ref('leitura')
            .limitToLast(size)
            .orderByChild('cliente')
            .on('value', dataSnapshot => {
                let items = [];

                dataSnapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    items.push(item);
                });

                callback(items);
            });
    };

    static login = (email, password) => {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    };

    static logout = () => {
        return firebaseAuth.signOut();
    }
}