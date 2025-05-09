import React, { useEffect } from 'react'
import Header from '@/components/ui/Header'
import DetailHeader from '../components/DetailHeader'
import { useParams } from 'react-router-dom'
import { db } from './../../../configs'
import { FormatResult } from '@/Shared/Services'
import { ItemListing, ItemImages } from './../../../configs/schema'
import { eq } from 'drizzle-orm'
import { useState } from 'react'

function ListingDetail() {
    const {id} = useParams();
    const [itemDetails, setItemDetails] = useState();

    useEffect(()=> {
        GetItemDetail();
    },[])

    const GetItemDetail = async() => {
        const result = await db.select().from(ItemListing)
        .innerJoin(ItemImages, eq(ItemImages.itemListingId,ItemListing.id))
        .where(eq(ItemListing.id,id));

        const resp = FormatResult(result);
        console.log(resp[0])
        setItemDetails(resp[0]);
    }
  return (
    <div>
        <Header/>

        <div className='p-10 md:px-20'>
        {/* Header Detail Component */}
        <DetailHeader itemDetails = {itemDetails}/>
        </div>
    </div>
  )
}

export default ListingDetail