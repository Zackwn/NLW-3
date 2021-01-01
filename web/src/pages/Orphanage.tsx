import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OrphanageInterface, OrphanageParams } from "../@types/orphanage";
import ManageOrphanageLayout from "../components/Layouts/ManageOrphanageLayout";
import OrphanageDetailModal from "../components/Orphanage/OrphanageDetailModal";
import api from "../services/api";

export default function Orphanage() {
   const { location } = useHistory<OrphanageParams>()
   const [orphanage, setOrphanage] = useState<OrphanageInterface>()

   useEffect(() => {
      if (!location.state) {
         return
      }

      async function getOrphanage(id: string) {
         const response = await api.get(`/orphanages/${id}`)
         setOrphanage(response.data)
      }

      const params = location.state

      if (params.orphanage) {
         setOrphanage(params.orphanage)
      }
      if (params.id) {
         getOrphanage(params.id)
      }
   }, [location.state])

   if (!orphanage) {
      return (
         <ManageOrphanageLayout>
            <span style={{ color: '#000', padding: 20 }} >Loading...</span>
         </ManageOrphanageLayout>
      )
   }

   return (
      <ManageOrphanageLayout>
         <OrphanageDetailModal extraPaddingBottom orphanage={orphanage} />
      </ManageOrphanageLayout>
   );
}