import { ImageInterface } from "./image";

export interface OrphanageInterface {
   id: number,
   name: string,
   latitude: number,
   longitude: number,
   about: string,
   instructions: string,
   opening_hours: string,
   open_on_weekends: boolean,
   images: ImageInterface[]
}

export interface OrphanageParams {
   id: string
}