import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import React from "react";
import { Separator } from "@radix-ui/react-select";

import MyListing from "./components/MyListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Profile() {  
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        {/* tabs */}
        <Tabs defaultValue="My-listing" className="w-full">
          <TabsList className='bg-white'>
            <TabsTrigger className="!bg-white" value="My-listing">My Listing</TabsTrigger>
            <TabsTrigger className="!bg-white mx-3" value="inbox">Inbox</TabsTrigger>
            <TabsTrigger className="!bg-white" value="profile">Profile</TabsTrigger>
          </TabsList>
          <Separator className="w-full h-1 !bg-[#1AB6B4] border rounded-full" />
          <TabsContent value="My-listing"><MyListing/></TabsContent>
          <TabsContent value="inbox">Inbox</TabsContent>
          <TabsContent value="profile">profile</TabsContent>
        </Tabs>


      </div>
    </div>
  );
}

export default Profile;
