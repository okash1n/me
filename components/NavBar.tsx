import Changer from "../islands/Changer.tsx";

type Props = {
  active: string;
  imageUrl?: string;
};

export default function Header({ active, imageUrl }: Props) {
  const menus = [
    { name: "Home", href: "/" },
    { name: "お問い合わせ", href: "/inquiry" },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl py-6 px-8 flex flex-col sm:flex-row gap-4">
          <a href="/" className="flex items-center flex-1">
            <image src="logo.svg" className="h-6" />
            <div className="text-2xl  ml-1 font-bold">
              {Deno.env.get("SITE_NAME")}
            </div>
          </a>

          <ul className="flex items-center gap-6">
            {menus.map((menu) => (
              <li>
                <a
                  href={menu.href}
                  className={
                    "text-gray-500 hover:text-gray-700 py-1 border-gray-500" +
                    (menu.href === active ? " font-bold border-b-2" : "")
                  }
                >
                  {menu.name}
                </a>
              </li>
            ))}
            <li>
              <Changer />
            </li>
          </ul>
        </div>
      </div>
      {imageUrl && (
        <div
          className="bg-cover h-48 bg-center mb-6"
          style={{
            backgroundImage: "url(" + imageUrl + ")",
            backgroundSize: "cover",
          }}
        ></div>
      )}
    </>
  );
}
