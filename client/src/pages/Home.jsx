import { Divider, Flex, Image } from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";

import well1 from "../assets/images/home/well1.jpg";
import well2 from "../assets/images/home/well2.jpg";
import well3 from "../assets/images/home/well3.jpg";

export default function Home() {
  return (
    <div>
      <Flex
        wrap={"wrap"}
        w={"90vw"}
        justify={"center"}
        align={"center"}
        mx={"auto"}
        paddingTop={{ base: 20, md: 24 }}
        mb={10}
      >
        <Fade fraction={0.5} triggerOnce={true}>
          <Image
            src={well1}
            h={{ base: "18rem", md: "24rem" }}
            w={{ base: "20rem", md: "30rem" }}
            rounded={20}
            mr={{ base: "0", md: "16" }}
            my={10}
            alt="well"
          />

          <div className="w-[95%] md:w-[40vw] mx-auto">
            <p className="font-bold text-xl md:text-2xl font-serif">
              The Challenge of Finding New Wells
            </p>
            <p className="text-justify text-md md:text-lg font-serif mt-4">
              Finding new wells is a complex and challenging task that requires
              a combination of advanced technology, geological expertise, and a
              bit of luck. It involves analyzing various factors such as
              geological formations, water table levels, and historical data to
              identify potential locations. Despite the advancements in
              technology, the process remains inherently uncertain, as the
              underground environment is dynamic and unpredictable. However, the
              rewards of discovering a new well can be significant, providing
              access to a valuable resource that is essential for various
              purposes, including agriculture, industry, and drinking water.
            </p>
          </div>
        </Fade>
      </Flex>

      <Divider my={10} />

      <Flex
        wrap={"wrap-reverse"}
        w={"90vw"}
        justify={"center"}
        align={"center"}
        mx={"auto"}
      >
        <Fade fraction={0.7} triggerOnce={true}>
          <div className="w-[95%] md:w-[40vw] mx-auto">
            <p className="font-bold text-xl md:text-2xl font-serif">
              The Importance of Well Prediction in Water Management
            </p>
            <p className="text-justify text-md md:text-lg font-serif mt-4">
              Well prediction plays a crucial role in effective water
              management, helping to ensure the sustainable use of groundwater
              resources. By accurately predicting the behavior of wells, water
              managers can make informed decisions about extraction rates,
              recharge strategies, and resource allocation. This, in turn, helps
              to prevent overexploitation of groundwater reserves and minimize
              the risk of depletion. Well prediction also plays a vital role in
              environmental protection, as it allows for the identification of
              potential contamination risks and the implementation of mitigation
              measures.
            </p>
          </div>
          <Image
            src={well3}
            h={{ base: "18rem", md: "24rem" }}
            w={{ base: "20rem", md: "30rem" }}
            rounded={20}
            ml={{ base: "0", md: "16" }}
            my={10}
            alt="well"
          />
        </Fade>
      </Flex>

      <Divider my={10} />

      <Flex
        wrap={"wrap"}
        w={"90vw"}
        justify={"center"}
        align={"center"}
        mx={"auto"}
        mb={10}
      >
        <Fade fraction={0.7} triggerOnce={true}>
          <Image
            src={well2}
            h={{ base: "18rem", md: "24rem" }}
            w={{ base: "20rem", md: "30rem" }}
            rounded={20}
            mr={{ base: "0", md: "16" }}
            my={10}
            alt="well"
          />
          <div className="w-[95%] md:w-[40vw] mx-auto">
            <p className="font-bold text-xl md:text-2xl font-serif">
              Understanding Groundwater: The Key to Sustainable Development
            </p>
            <p className="text-justify text-md md:text-lg font-serif mt-4">
              Groundwater is a vital resource that plays a crucial role in
              sustaining life on Earth. It serves as a source of drinking water
              for billions of people, supports agriculture, and helps maintain
              the health of ecosystems. However, groundwater is a finite
              resource that is often overexploited, leading to depletion and
              contamination. Understanding the dynamics of groundwater,
              including how it moves through underground aquifers and interacts
              with surface water bodies, is essential for sustainable
              development. Well prediction is a valuable tool in this regard, as
              it helps us better understand the behavior of groundwater and make
              informed decisions about its management and use.
            </p>
          </div>
        </Fade>
      </Flex>
    </div>
  );
}
