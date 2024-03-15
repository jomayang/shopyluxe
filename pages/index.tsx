import Head from "next/head";
import { sha256 } from "js-sha256";
import bg from "../public/background.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FormLabel } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import zIndex from "@mui/material/styles/zIndex";
import supabase from "../supabase-config";

import Countdown from "react-countdown/dist/index";
import { setCookie, getCookie } from "cookies-next";
import { fbq } from "react-facebook-pixel";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [offer, setOffer] = useState(1);
  const [province, setProvince] = useState("");
  const [number, setNumber] = useState<any>(null);
  const [nameErr, setNameErr] = useState(false);
  const [numberErr, setNumberErr] = useState(false);
  const [provinceErr, setProvinceErr] = useState(false);
  const [formErr, setFormErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agents, setAgents] = useState<any>([]);
  const [agentsCount, setAgentsCount] = useState(0);
  const [previewImage, setPreviewImage] = useState("n01.jpg");
  const [size, setSize] = useState("l");
  const [model, setModel] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [eventId, setEventId] = useState("");
  const [testEventCode, setTestEventCode] = useState("");

  useEffect(() => {
    const isSubmittedTemp = getCookie("is-submitted") ? true : false;
    setIsSubmitted(isSubmittedTemp);
  }, []);
  const router = useRouter();
  // Renderer callback with condition
  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="w-full flex justify-center">
          <span className="flex mt-4">
            <span>
              <span className="h-16 mr-1 rounded-tl-md text-white rounded-tr-md w-16 flex justify-center items-center bg-amber-600  text-5xl">
                {days}
              </span>
              <span className="w-16 flex rounded-bl-md rounded-br-md justify-center bg-white">
                أيام
              </span>
            </span>
            <span>
              <span className="h-16 mr-1 rounded-tl-md text-white rounded-tr-md w-16 flex justify-center items-center bg-amber-600  text-5xl">
                {hours}
              </span>
              <span className="w-16 flex rounded-bl-md rounded-br-md justify-center bg-white">
                ساعة
              </span>
            </span>
            <span>
              <span className="h-16 mr-1 rounded-tl-md text-white rounded-tr-md w-16 flex justify-center items-center bg-amber-600  text-5xl">
                {minutes}
              </span>
              <span className="w-16 flex rounded-bl-md rounded-br-md justify-center bg-white">
                دقيقة
              </span>
            </span>
            <span>
              <span className="h-16 mr-1 rounded-tl-md rounded-tr-md text-white w-16 flex justify-center items-center bg-amber-600  text-5xl">
                {seconds}
              </span>
              <span className="w-16 flex rounded-bl-md rounded-br-md justify-center bg-white">
                ثانية
              </span>
            </span>
          </span>
        </div>
      );
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async (event: any) => {
      try {
        if (!isSubmitted && number !== null) {
          // const agents_dict = [17, 23];
          // const agentId =
          //   agents_dict[Math.floor(Math.random() * agents_dict.length)];
          const agentId = 12;
          let productModel;
          let productColor;
          switch (model) {
            case 1:
              productModel = "1";
              productColor = "noir";
              break;
            case 2:
              productModel = "1";
              productColor = "tabac";
              break;
            case 3:
              productModel = "1";
              productColor = "bleu";
              break;
            case 4:
              productModel = "1";
              productColor = "beige";
              break;
            default:
              productModel = "1";
              productColor = "noir";
              break;
          }
          const { error } = await supabase.from("leads").insert({
            first_name: fullName,
            last_name: "",
            address: "",
            phone: `${number}`,
            wilaya: province,
            commune: address,
            product: `ensemble_n4_`,
            size,
            color: productColor,
            agent_id: agentId,
            offer: `${offer}`,
            is_abondoned: true,
          });
          if (error) {
            setFormErr(false);
          }
        }
      } catch (error) {}
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [address, fullName, number, province, isSubmitted, model, offer, size]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("role", "agent");

        if (data) {
          console.log("the data tracker: ", data);
          setAgents(data);
          setAgentsCount(data.length);
        }

        if (error) {
          console.log("something went wrong ", error);
        }
      } catch (error) {
        console.log("catched an error ", error);
      }
    };

    fetchAgents();
  }, []);

  const handleAddLead = async (e: any) => {
    e.preventDefault();
    if (
      fullName !== "" &&
      province !== "" &&
      address !== "" &&
      number !== "" &&
      number !== null
    ) {
      try {
        setIsLoading(true);
        // let agentId;
        /*if (agentsCount !== 0) {
          agentId = agents[Math.floor(Math.random() * agentsCount)].id;
        } else {
          agentId = 23;
        }*/
        const agents_dict = [17, 23];
        const agentId =
          agents_dict[Math.floor(Math.random() * agents_dict.length)];
        //const agentId = 12;
        let productModel;
        let productColor;
        switch (model) {
          case 1:
            productModel = "1";
            productColor = "noir";
            break;
          case 2:
            productModel = "1";
            productColor = "tabac";
            break;
          case 3:
            productModel = "1";
            productColor = "bleu";
            break;
          case 4:
            productModel = "1";
            productColor = "beige";
            break;

          default:
            productModel = "1";
            productColor = "noir";
            break;
        }

        const { error } = await supabase.from("leads").insert({
          first_name: fullName,
          last_name: "",
          address: "",
          phone: `${number}`,
          wilaya: province,
          commune: address,
          product: `ensemble_n4_`,
          size,
          color: productColor,
          agent_id: agentId,
          offer: `${offer}`,
        });
        if (error) {
          setFormErr(false);
        } else {
          setCookie("is-submitted", true, { maxAge: 60 * 60 * 3 });

          // fetch(
          //   `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.NEXT_PUBLIC_FBACCESSKEY}`,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       data: [
          //         {
          //           event_name: "Purchase",
          //           event_time: Math.floor(Date.now() / 1000),
          //           event_id: eventId,
          //           action_source: "website",
          //           user_data: {
          //             fn: [sha256(fullName)],
          //             ph: [sha256(number)],
          //           },
          //           custom_data: {
          //             currency: "USD",
          //             value: "12",
          //           },
          //         },
          //       ],
          //       test_event_code: testEventCode,
          //     }),
          //   }
          // )
          //   .then((response) => response.json())
          //   .then((data) => console.log(data))
          //   .catch((error) => console.error("Error api:", error));
          setIsSubmitted(true);
          router.push("/thankyou");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormErr(true);
    }
  };

  const handleSetError = (field: string) => {
    if (field == "name") {
      if (fullName === "") {
        setNameErr(true);
      } else {
        setNameErr(false);
      }
    } else if (field === "number") {
      if (number === null) {
        setNumberErr(true);
      } else {
        setNumberErr(false);
      }
    } else if (field === "province") {
      if (province === "") {
        setProvinceErr(true);
      } else {
        setProvinceErr(false);
      }
    }
  };
  const handleUpdateModel = (newModel: number) => {
    setModel(newModel);
    // console.log(newModel);
    // switch (newModel) {
    //   case 1:
    //     setPreviewImage("noir-01.jpg");
    //     break;
    //   case 2:
    //     setPreviewImage("bl02.jpg");
    //     break;
    //   case 3:
    //     setPreviewImage("b01.jpg");
    //     break;

    //   default:
    //     setPreviewImage("noir-01.jpg");
    //     break;
    // }
  };

  useEffect(() => console.log("updated", model), [model]);
  return (
    <>
      <Head>
        <title>Shopydz - Elevate your look</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="facebook-domain-verification"
          content="iquvzyp0swcobn7sloous5ul2t87mm"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-auto bg-no-repeat bg-center">
        <header className="bg-[#151515] border-b border-gray-600 fixed top-0 h-20 w-full z-20">
          <div className="w-full flex justify-between px-3 py-3">
            <div className="py-3">
              <img src="logo-dark.png" className="h-8" alt="" />
            </div>
            <div className=" mt-3">
              <a
                href="#form"
                className=" bg-amber-500 hover:bg-amber-400 text-white duration-150 ease-in-out text-white  px-6 py-3 rounded-lg font-bold"
              >
                أطلب الآن
              </a>
            </div>
          </div>
        </header>
        <main className="w-full  mt-20 px-6 bg-[#151515]">
          <div className="w-full pt-4 pb-4 text-center  z-10 mt-4">
            <h1 className="text-5xl mb-2 text-white">
              ابدأ رحلة الأناقة الشخصية مع أحدث موديلات الربيع
            </h1>
            <p className="text-2xl text-white">
              {" "}
              تصاميم فريدة بألوان متنوعة، مثالية لكل المناسبات
            </p>
            {/* <p className="text-xl  font-bold text-center   bg-gray-100 rounded-xl py-2 mt-1">
              
              عرض محدود استفد من{" "}
              <span className="text-green-500">تخفيض (36%)</span>
            </p> */}
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="w-full hidden md:block">
              <div className="my-4">
                <div>
                  <img src={previewImage} alt="" className="w-full" />
                </div>
                <div className="grid gap-2 grid-cols-6 mt-2">
                  <button onClick={() => setPreviewImage("n01.jpg")}>
                    <Image src="/n01.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("t01.jpg")}>
                    <Image src="/t01.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("bl01.jpg")}>
                    <Image src="/bl01.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("b01.jpg")}>
                    <Image src="/b01.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("n02.jpg")}>
                    <Image src="/n02.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("t03.jpg")}>
                    <Image src="/t03.jpg" width={128} height={160} alt="" />
                  </button>
                </div>
              </div>
              <div>
                <Image
                  height={510}
                  width={382}
                  src="/n03.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/n04.jpg"
                  className="my-3"
                  alt=""
                />

                <Image
                  height={510}
                  width={382}
                  src="/t02.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/t04.jpg"
                  className="my-3"
                  alt=""
                />

                <Image
                  height={510}
                  width={382}
                  src="/bl02.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/bl03.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/b03.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/b04.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/bl05.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/b02.jpg"
                  className="my-3"
                  alt=""
                />
              </div>
              <div className=" text-right mt-4">
                <h1 className="text-xl mb-2 text-white">:كيفية الطلب </h1>
                <div>
                  <div className="flex text-right w-full justify-end mt-3 text-white ">
                    <span> أدخل معلوماتك الشخصية في الإستمارة أعلاه</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right  w-full justify-end mt-3 text-white">
                    <span> أنقر على أطلب الان</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                </div>
              </div>
              <div className=" text-right mt-8 mb-8">
                <h1 className="text-xl mb-2  text-white">:كيفية الإستلام </h1>
                <p className="text-white ">
                  طريقة بسيط جدا بعد أن تطلب المنتج سيتصل بك أحد موظفي الشركة
                  ليؤكد معك الطلب ، وسنرسل لك المنتج والدفع عند الاستلام
                </p>
              </div>
            </div>
            <div className="w-full block md:hidden">
              <div className="my-4">
                <div>
                  <img src={previewImage} alt="" className="w-full" />
                </div>
                <div className="grid gap-2 grid-cols-6 mt-2">
                  <button onClick={() => setPreviewImage("n01.jpg")}>
                    <Image src="/n01.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("t01.jpg")}>
                    <Image src="/t01.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("bl01.jpg")}>
                    <Image src="/bl01.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("b01.jpg")}>
                    <Image src="/b01.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("n02.jpg")}>
                    <Image src="/n02.jpg" width={128} height={160} alt="" />
                  </button>
                  <button onClick={() => setPreviewImage("t03.jpg")}>
                    <Image src="/t03.jpg" width={128} height={160} alt="" />
                  </button>
                </div>
              </div>
            </div>

            <div className="z-10">
              <div className="bg-gradient-to-tr from-lime-500 via-orange-500  to-amber-500 p-1 rounded-2xl">
                <div
                  className="bg-[#282828] rounded-2xl w-full  py-4 px-6 "
                  id="form"
                >
                  {isSubmitted ? (
                    <p className=" text-center text-white">
                      شكرا جزيلا على ثقتكم سيتم الإتصال بكم في غضون 24 ساعة
                      لتأكيد طلبكم فالرجاء إبقاء الهاتف مفتوح
                    </p>
                  ) : (
                    <>
                      <h1 className="text-3xl  font-bold text-center text-white">
                        <span className="text-amber-500">(35% تخفيض)</span>
                        <br /> أطلب الآن واستفد من العرض{" "}
                      </h1>
                      <div className="  my-4 py-4 rounded-lg bg-white/5">
                        <h1 className="text-2xl text-amber-500 text-center">
                          العرض ينتهي خلال
                        </h1>
                        <Countdown
                          date={Date.now() + 5300000}
                          renderer={renderer}
                        />
                      </div>
                      <form action="#" method="post">
                        <div className="p-4 border border-amber-600 rounded-lg mt-6 text-white">
                          <h3 className="text-lg mt-4 text-center ">
                            قم بإختيار اللون و المقاس{" "}
                          </h3>
                          <div>
                            <label className="label w-full text-right block mt-3">
                              <span className="label-text  ">اللون</span>
                            </label>
                            <div className="justify-end gap-1 flex-wrap flex mt-2">
                              <div
                                onClick={() => handleUpdateModel(1)}
                                className={`flex cursor-pointer p-1 border-2 hover:border-amber-500 w-16 h-16 rounded-lg ${
                                  model === 1
                                    ? "border-amber-700"
                                    : "border-gray-700"
                                }`}
                              >
                                <Image
                                  src="/noir.png"
                                  className="rounded-lg"
                                  width={64}
                                  height={64}
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleUpdateModel(2)}
                                className={`flex cursor-pointer  p-1 border-2  hover:border-amber-500 w-16 h-16 rounded-lg ${
                                  model === 2
                                    ? "border-amber-700"
                                    : "border-gray-700"
                                }`}
                              >
                                <Image
                                  src="/tabac.png"
                                  width={64}
                                  height={64}
                                  alt=""
                                  className="rounded-lg"
                                />
                              </div>
                              <div
                                onClick={() => handleUpdateModel(3)}
                                className={`flex cursor-pointer  p-1 border-2  hover:border-amber-500 w-16 h-16 rounded-lg ${
                                  model === 3
                                    ? "border-amber-700"
                                    : "border-gray-700"
                                }`}
                              >
                                <Image
                                  src="/bleu.png"
                                  width={64}
                                  height={64}
                                  alt=""
                                  className="rounded-lg"
                                />
                              </div>
                              <div
                                onClick={() => handleUpdateModel(4)}
                                className={`flex cursor-pointer  p-1 border-2  hover:border-amber-500 w-16 h-16 rounded-lg ${
                                  model === 4
                                    ? "border-amber-700"
                                    : "border-gray-700"
                                }`}
                              >
                                <Image
                                  src="/beige.png"
                                  width={64}
                                  height={64}
                                  alt=""
                                  className="rounded-lg"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="label w-full text-right block mt-3">
                              <span className="label-text  ">المقاس</span>
                            </label>
                            <div className="grid grid-cols-6 gap-2 mt-2">
                              <div
                                onClick={() => setSize("m")}
                                className={`flex p-1 border-2  cursor-pointer  hover:border-amber-500  text-center justify-center rounded-lg ${
                                  size === "m"
                                    ? "border-amber-500"
                                    : "border-gray-700"
                                }`}
                              >
                                M
                              </div>
                              <div
                                onClick={() => setSize("l")}
                                className={`flex p-1 border-2  cursor-pointer  hover:border-amber-500  text-center justify-center rounded-lg ${
                                  size === "l"
                                    ? "border-amber-500"
                                    : "border-gray-700"
                                }`}
                              >
                                L
                              </div>
                              <div
                                onClick={() => setSize("xl")}
                                className={`flex p-1 border-2  cursor-pointer  hover:border-amber-500  text-center justify-center rounded-lg ${
                                  size === "xl"
                                    ? "border-amber-500"
                                    : "border-gray-700"
                                }`}
                              >
                                XL
                              </div>
                              <div
                                onClick={() => setSize("xxl")}
                                className={`flex p-1 border-2  cursor-pointer  hover:border-amber-500  text-center justify-center rounded-lg ${
                                  size === "xxl"
                                    ? "border-amber-500"
                                    : "border-gray-700"
                                }`}
                              >
                                XXL
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="label w-full text-right block mt-3">
                              <span className="label-text  ">العرض</span>
                            </label>
                            <div className="grid grid-rows-2 gap-2 mt-2">
                              <div
                                onClick={() => setOffer(1)}
                                className={`flex p-1 border-2  cursor-pointer  hover:border-amber-500  text-center justify-center rounded-lg ${
                                  offer === 1
                                    ? "border-amber-500"
                                    : "border-gray-700"
                                }`}
                              >
                                1 Ensemble (6900 DA)
                              </div>
                              <div
                                onClick={() => setOffer(2)}
                                className={`flex p-1 border-2  cursor-pointer  hover:border-amber-500  text-center justify-center rounded-lg ${
                                  offer === 2
                                    ? "border-amber-500"
                                    : "border-gray-700"
                                }`}
                              >
                                2 Ensembles (13000 DA)
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg  text-center mt-4 text-white">
                          الرجاء إدخال معلوماتك الشخصية و سوف نتصل بك للتأكيد{" "}
                        </h3>
                        <div className="text-white">
                          <label className="label w-full text-right block mt-3">
                            <span className="label-text  right-0 ">
                              الإسم و اللقب
                            </span>
                          </label>
                          <input
                            type="text"
                            className="p-3 mt-2 bg-white rounded-md w-full text-right"
                            placeholder="الإسم و اللقب"
                            value={fullName}
                            onBlur={() => handleSetError("name")}
                            required
                            onChange={(e) => setFullName(e.target.value)}
                          />
                          {nameErr && (
                            <p className="text-right text-amber-600 ">
                              ادخل الاسم
                            </p>
                          )}
                        </div>
                        <div className="text-white">
                          <label className="label w-full text-right block mt-3">
                            <span className="label-text  ">رقم الهاتف</span>
                          </label>
                          <input
                            type="number"
                            className="p-3 mt-2 bg-white rounded-md w-full text-right"
                            placeholder="رقم الهاتف"
                            value={number}
                            onBlur={() => handleSetError("number")}
                            required
                            onChange={(e) => setNumber(e.target.value)}
                          />
                          {numberErr && (
                            <p className="text-right text-amber-600">
                              الرجاء إدخال رقم الهاتف
                            </p>
                          )}
                        </div>
                        <div className="text-white">
                          <label className="label w-full text-right block mt-3">
                            <span className="label-text  ">الولاية</span>
                          </label>
                          <input
                            type="text"
                            className="p-3 mt-2 bg-white rounded-md w-full text-right"
                            placeholder="الولاية"
                            value={province}
                            onBlur={() => handleSetError("province")}
                            required
                            onChange={(e) => setProvince(e.target.value)}
                          />
                          {provinceErr && (
                            <p className="text-right text-amber-600">
                              الرجاء إدخال الولاية
                            </p>
                          )}
                        </div>
                        <div className="text-white">
                          <label className="label w-full text-right block mt-3">
                            <span className="label-text  ">البلدية</span>
                          </label>
                          <input
                            type="text"
                            className="p-3 mt-2 bg-white rounded-md w-full text-right"
                            placeholder="البلدية"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>

                        <div>
                          <div>
                            <div className="">
                              {/* <p className=" mr-3 my-6 text-lg text-center ">
                          30% تخفيض
                        </p> */}
                              <p className="sm:flex block text-center mt-12 justify-center">
                                <span className="text-5xl text-amber-500 font-bold  block sm:inline">
                                  {offer === 1 ? "6900" : "13000"} DA
                                </span>

                                <span className=" text-white text-lg line-through block sm:inline">
                                  {offer === 1 ? "10800" : "21600"} DA
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          {formErr && (
                            <p className="text-center  bg-amber-600/60 py-3 rounded-lg mt-4">
                              الرجاء إدخال جميع المعلومات
                            </p>
                          )}
                        </div>
                        <div className="mt-4">
                          <button
                            // disabled={!fullName || !number || !province}
                            onClick={handleAddLead}
                            disabled={isLoading}
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-500 text-white duration-150 ease-in-out  button-bounce text-2xl rounded-lg w-full p-4 text-center  font-bold "
                          >
                            {isLoading && <span className="loader"></span>}أطلب
                            الآن
                          </button>
                        </div>
                        <div className="w-full block md:hidden">
                          {fullName === "" ||
                          number === null ||
                          address === "" ||
                          province === "" ? (
                            <a
                              href="#form"
                              className="bg-amber-500  fixed bottom-3 left-3 right-3 text-white text-xl rounded-lg  p-3 text-center  font-bold hover:bg-amber-400"
                            >
                              أطلب الآن
                            </a>
                          ) : (
                            <button
                              onClick={handleAddLead}
                              disabled={isLoading}
                              type="submit"
                              className="bg-amber-500 z-20  fixed bottom-3 text-white left-3 right-3 text-xl rounded-lg  p-3 text-center  font-bold hover:bg-amber-400"
                            >
                              {isLoading && <span className="loader"></span>}
                              أطلب الآن
                            </button>
                          )}
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full block md:hidden z-0 ">
              {/* <iframe
                // width="560"
                height="315"
                className="w-full  rounded-2xl overflow-hidden"
                src="https://www.youtube.com/embed/cB2vnyM5sEM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}
              <div className="text-right mt-0">
                <Image
                  height={510}
                  width={382}
                  src="/n03.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/n04.jpg"
                  className="my-3"
                  alt=""
                />

                <Image
                  height={510}
                  width={382}
                  src="/t02.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/t04.jpg"
                  className="my-3"
                  alt=""
                />

                <Image
                  height={510}
                  width={382}
                  src="/bl02.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/bl03.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/b03.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/b04.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/bl05.jpg"
                  className="my-3"
                  alt=""
                />
                <Image
                  height={510}
                  width={382}
                  src="/b02.jpg"
                  className="my-3"
                  alt=""
                />
              </div>
              <div className=" text-right mt-4 text-white">
                <h1 className="text-xl mb-2 ">:كيفية الطلب </h1>
                <div>
                  <div className="flex text-right w-full  justify-end mt-3">
                    <span> أدخل معلوماتك الشخصية في الإستمارة أعلاه</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right w-full  justify-end mt-3">
                    <span> أنقر على أطلب الان</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                </div>
              </div>
              <div className=" text-right mt-8 mb-20 text-white">
                <h1 className="text-xl mb-2 ">:كيفية الإستلام </h1>
                <p className="">
                  طريقة بسيط جدا بعد أن تطلب المنتج سيتصل بك أحد موظفي الشركة
                  ليؤكد معك الطلب ، وسنرسل لك المنتج والدفع عند الاستلام
                </p>
              </div>
              <div className="my-4"></div>
            </div>
          </div>

          <div></div>
        </main>
      </div>
    </>
  );
}
