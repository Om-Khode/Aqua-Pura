import React from "react";
import {
  FormLabel,
  NumberInput,
  NumberInputField,
  Flex,
  Select,
  Box,
  GridItem,
  Grid,
  useColorModeValue,
  LightMode,
  useColorMode,
} from "@chakra-ui/react";
import PhSlider from "./PhSlider";

const InputField = ({
  label,
  value,
  onChange,
  options,
  selected,
  onSelect,
  info,
  ...props
}) => {
  const format = (val) => (selected ? val + " " + selected : val);
  const bgColor = useColorModeValue("blue.500", "blue.600");
  const { colorMode } = useColorMode();

  return (
    <GridItem>
      <Box
        bg={"bg.surface"}
        border={"1px solid"}
        borderColor={"gray.300"}
        px={{ base: "2", md: "6" }}
        py={{ base: "2", md: "3" }}
        borderRadius={{ base: "lg", md: "xl" }}
        w={"100%"}
      >
        <Flex align={"flex-end"} justify={"center"}>
          <FormLabel htmlFor={label} w={"20%"} textAlign={"right"}>
            {label}
          </FormLabel>
          <NumberInput
            {...props}
            value={!info ? value : format(value)}
            isReadOnly={info}
            onFocus={(e) => info && e.target.blur()}
            onChange={!info ? onChange : () => {}}
            w={"42%"}
            min={0}
            max={999999}
          >
            <NumberInputField borderRightRadius={0} />
          </NumberInput>
          {!info && options && (
            <Select
              w={"38%"}
              bg={bgColor}
              color={"white"}
              variant={"filled"}
              defaultValue={selected}
              borderLeftRadius={0}
              _hover={{ bg: "blue.600" }}
              _focus={{ bg: "blue.600" }}
              onChange={(e) => onSelect(e.target.value)}
            >
              {options.map((option) => (
                <option
                  key={option}
                  value={option}
                  className={colorMode === "light" ? "text-black" : ""}
                >
                  {option}
                </option>
              ))}
            </Select>
          )}
        </Flex>
      </Box>
    </GridItem>
  );
};

const ChemicalInputFields = ({ form, setForm, info = false }) => {
  const mUnits = ["µS/cm", "mS/cm", "dS/m"];
  const lUnits = ["mg/L", "meq/L"];

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(1, 1fr)",
        lg: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)}",
      }}
      gap={6}
    >
      <PhSlider form={form} setForm={setForm} info={info} />
      {/* <InputField
        label="pH:"
        name="ph"
        value={form.ph.value}
        onChange={(valueString) => {
          setForm({ ...form, ph: { value: valueString, unit: form.ph.unit } });
        }}
        info={info}
      /> */}
      <InputField
        label="EC:"
        name="ec"
        value={form.ec.value}
        onChange={(valueString) => {
          setForm({ ...form, ec: { value: valueString, unit: form.ec.unit } });
        }}
        options={mUnits}
        selected={form.ec.unit}
        onSelect={(e) => {
          setForm({ ...form, ec: { value: form.ec.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="CO3:"
        name="co3"
        value={form.co3.value}
        onChange={(valueString) => {
          setForm({
            ...form,
            co3: { value: valueString, unit: form.co3.unit },
          });
        }}
        options={lUnits}
        selected={form.ec.unit}
        onSelect={(e) => {
          setForm({ ...form, co3: { value: form.co3.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="HCO3:"
        name="hco3"
        value={form.hco3.value}
        onChange={(valueString) => {
          setForm({
            ...form,
            hco3: { value: valueString, unit: form.hco3.unit },
          });
        }}
        options={lUnits}
        selected={form.hco3.unit}
        onSelect={(e) => {
          setForm({ ...form, hco3: { value: form.hco3.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="Cl:"
        name="cl"
        value={form.cl.value}
        onChange={(valueString) => {
          setForm({ ...form, cl: { value: valueString, unit: form.cl.unit } });
        }}
        options={lUnits}
        selected={form.cl.unit}
        onSelect={(e) => {
          setForm({ ...form, cl: { value: form.cl.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="SO4:"
        name="so4"
        value={form.so4.value}
        onChange={(valueString) => {
          setForm({
            ...form,
            so4: { value: valueString, unit: form.so4.unit },
          });
        }}
        options={lUnits}
        selected={form.so4.unit}
        onSelect={(e) => {
          setForm({ ...form, so4: { value: form.so4.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="NO3:"
        name="no3"
        value={form.no3.value}
        onChange={(valueString) => {
          setForm({
            ...form,
            no3: { value: valueString, unit: form.no3.unit },
          });
        }}
        options={lUnits}
        selected={form.no3.unit}
        onSelect={(e) => {
          setForm({ ...form, no3: { value: form.no3.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="PO4:"
        name="po4"
        value={form.po4.value}
        onChange={(valueString) => {
          setForm({
            ...form,
            po4: { value: valueString, unit: form.po4.unit },
          });
        }}
        options={lUnits}
        selected={form.po4.unit}
        onSelect={(e) => {
          setForm({ ...form, po4: { value: form.po4.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="TH:"
        name="th"
        value={form.th.value}
        onChange={(valueString) => {
          setForm({ ...form, th: { value: valueString, unit: form.th.unit } });
        }}
        options={lUnits}
        selected={form.th.unit}
        onSelect={(e) => {
          setForm({ ...form, th: { value: form.th.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="Ca:"
        name="ca"
        value={form.ca.value}
        onChange={(valueString) => {
          setForm({ ...form, ca: { value: valueString, unit: form.ca.unit } });
        }}
        options={lUnits}
        selected={form.ca.unit}
        onSelect={(e) => {
          setForm({ ...form, ca: { value: form.ca.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="Mg:"
        name="mg"
        value={form.mg.value}
        onChange={(valueString) => {
          setForm({ ...form, mg: { value: valueString, unit: form.mg.unit } });
        }}
        options={lUnits}
        selected={form.mg.unit}
        onSelect={(e) => {
          setForm({ ...form, mg: { value: form.mg.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="Na:"
        name="na"
        value={form.na.value}
        onChange={(valueString) => {
          setForm({ ...form, na: { value: valueString, unit: form.na.unit } });
        }}
        options={lUnits}
        selected={form.na.unit}
        onSelect={(e) => {
          setForm({ ...form, na: { value: form.na.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="K:"
        name="k"
        value={form.k.value}
        onChange={(valueString) => {
          setForm({ ...form, k: { value: valueString, unit: form.k.unit } });
        }}
        options={lUnits}
        selected={form.k.unit}
        onSelect={(e) => {
          setForm({ ...form, k: { value: form.k.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="F:"
        name="f"
        value={form.f.value}
        onChange={(valueString) => {
          setForm({ ...form, f: { value: valueString, unit: form.f.unit } });
        }}
        options={lUnits}
        selected={form.f.unit}
        onSelect={(e) => {
          setForm({ ...form, f: { value: form.f.value, unit: e } });
        }}
        info={info}
      />
      <InputField
        label="SiO2:"
        name="sio2"
        value={form.sio2.value}
        onChange={(valueString) => {
          setForm({
            ...form,
            sio2: { value: valueString, unit: form.sio2.unit },
          });
        }}
        options={lUnits}
        selected={form.sio2.unit}
        onSelect={(e) => {
          setForm({ ...form, sio2: { value: form.sio2.value, unit: e } });
        }}
        info={info}
      />
    </Grid>
  );
};

export default ChemicalInputFields;
