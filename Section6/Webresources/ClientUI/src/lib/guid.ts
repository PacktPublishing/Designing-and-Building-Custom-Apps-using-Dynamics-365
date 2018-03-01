namespace sf365.libs {
    export class Guid {
        static compare(id1: string, id2: string): boolean {
            return (id1.replace("{", "").replace("}", "").toLowerCase() ==
                id2.replace("{", "").replace("}", "").toLowerCase());
        }
    }

}