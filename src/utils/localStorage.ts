import mitt from 'mitt';
import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

const emitter = mitt();
const STORAGE_EVENT = 'storage';
export const FAVORITES_KEY = 'favorites';

function emitStorageUpdate() {
  unstable_batchedUpdates(() => {
    emitter.emit(STORAGE_EVENT);
  });
}

window.addEventListener('storage', () => {
  emitStorageUpdate();
});

export function readStorageItem(key: string): string | undefined {
  return localStorage.getItem(key) ?? undefined;
}

export function updateStorageItem(
  key: string,
  updater: (prev: string | undefined) => string | undefined,
): void {
  const prev = readStorageItem(key);
  const next = updater(prev);

  if (next == null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, next);
  }

  emitStorageUpdate();
}

export function writeStorageItem(key: string, value: string): void {
  updateStorageItem(key, () => value);
}

export function removeStorageItem(key: string): void {
  updateStorageItem(key, () => undefined);
}

export function subscribeToStorageItem(
  key: string,
  listener: (value: string | undefined) => void,
): () => void {
  let lastValue = readStorageItem(key);

  const handler = () => {
    const value = readStorageItem(key);

    if (!Object.is(lastValue, value)) {
      lastValue = value;
      listener(value);
    }
  };

  emitter.on(STORAGE_EVENT, handler);

  listener(lastValue);

  return () => {
    emitter.off(STORAGE_EVENT, handler);
  };
}

export function useStorageValue(key: string): string | undefined {
  const [value, setValue] = useState(() => readStorageItem(key));

  useEffect(() => subscribeToStorageItem(key, setValue), [key]);

  return value;
}
