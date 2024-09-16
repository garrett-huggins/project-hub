import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

export function UserAvater({
  session: {
    user: { image, username },
  },
}: {
  session: {
    user: {
      image: string;
      username: string;
    };
  };
}) {
  return (
    <Link href="/profile">
      <Avatar>
        <Image
          src={image}
          alt={`@${username}`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
