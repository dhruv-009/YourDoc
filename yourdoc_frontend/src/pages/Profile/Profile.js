import { ListCard } from "../../components/ListCard/ListCard";
import { Overlay } from "../../components/Overlay";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { useProfilePage } from "./useProfilePage";

export function Profile() {
  const { user, listData } = useProfilePage();

  return <div className="dark:bg-slate-700 min-h-screen min-w-max flex-wrap p-4">
    <h2 class="mt-0 mb-2 text-4xl font-medium leading-tight dark:text-gray-200">
      Patient Overview
    </h2>
    <div className="flex gap-4">
      <div className="relative">
        {!user ? <Overlay /> : null}
        <ProfileCard user={user} />
      </div>
      <div className="relative">
        {listData?.length ? null : <Overlay />}
        <ListCard title="Upcoming Appointments" listData={listData} />
      </div>
    </div>
  </div>
}