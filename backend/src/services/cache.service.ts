import { redisClient } from "../index";


export async function getValue(key: string): Promise<any> {
  console.log(`key ${key}`)
  let value =  await redisClient.get(key);
  console.log(`value ${value}`)
  if (value !== null) {
    return JSON.parse(value, (key, value) => {
      if (key === 'startDate' || key === 'endDate') {
        return new Date(value);
      }

      return value;
    });
  }
  else {
    console.log('erreur Redis')
  }
}

export async function setValue(key: string, value: any): Promise<any> {
  return await redisClient.set(key, JSON.stringify(value));
}

export function invalidateValue(key: string): Promise<any> {
  return redisClient.del(key);
}