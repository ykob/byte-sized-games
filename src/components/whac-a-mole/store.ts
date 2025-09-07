import { atom } from 'jotai';
import { createMoles } from './create-moles';

const molesAtom = atom(createMoles());

export const getMolesAtom = atom((get) => get(molesAtom));
