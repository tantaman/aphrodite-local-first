import { Engine, StorageType } from "./storageType";
import { DBResolver } from "./DBResolver";

export const printResolver: DBResolver = spyResolver(function () {
  console.log(arguments);
});

export const noopResolver: DBResolver = spyResolver(() => {});

export function spyResolver(spy: (...args: any) => any): DBResolver {
  return {
    type(t: StorageType) {
      return {
        engine(engine: Engine) {
          return {
            db(db: string) {
              return spyProxy(spy) as any;
            },
          };
        },
      };
    },
  };
}

function spyProxy(spy: (...args: any[]) => any) {
  const objProxyDef = {
    get(target, prop, receiver) {
      spy(prop);
      return new Proxy(() => {}, fnProxyDef);
    },
  };

  const fnProxyDef = {
    apply(target, thisArg, args) {
      spy(args);
      return new Proxy({}, objProxyDef);
    },
  };

  return new Proxy({}, objProxyDef);
}
