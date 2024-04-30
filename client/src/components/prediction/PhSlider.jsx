import {
  Box,
  Flex,
  FormLabel,
  GridItem,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function PhSlider({ form, setForm, info }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <GridItem>
      <Box
        bg={"bg.surface"}
        border={"1px solid"}
        borderColor={"gray.300"}
        px={{ base: "6", md: "6" }}
        py={{ base: "3", md: "3" }}
        borderRadius={{ base: "lg", md: "xl" }}
        w={"100%"}
      >
        <Flex align={"center"} justify={"center"}>
          <FormLabel htmlFor={"pH"} w={"20%"} mt={2} textAlign={"right"}>
            pH:
          </FormLabel>
          <Slider
            defaultValue={form.ph.value}
            w={"80%"}
            min={0}
            max={14}
            step={0.1}
            isReadOnly={info}
            onChange={
              !info
                ? (v) => {
                    setForm({ ...form, ph: { value: v } });
                  }
                : () => {}
            }
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderMark value={3.5} mt="2.5" ml={"-1"} fontSize="sm">
              <p className="text-xs font-bold">3.5</p>
            </SliderMark>
            <SliderMark value={7} mt="2.5" ml={"-1"} fontSize="sm">
              <p className="text-xs font-bold">7</p>
            </SliderMark>
            <SliderMark value={10.5} mt="2.5" ml="-2.5" fontSize="sm">
              <p className="text-xs font-bold">10.5</p>
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.600"
              color="white"
              fontWeight={"semibold"}
              placement="top"
              isOpen={showTooltip}
              label={`${form.ph.value}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Flex>
      </Box>
    </GridItem>
  );
}
