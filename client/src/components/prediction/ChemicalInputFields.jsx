import React from "react";
import {
  FormLabel,
  NumberInput,
  NumberInputField,
  Flex,
  Select,
  Box,
} from "@chakra-ui/react";

const InputField = ({
  label,
  value,
  onChange,
  options,
  onSelect,
  ...props
}) => (
  <Box
    bg={"bg.surface"}
    border={"1px solid"}
    borderColor={"gray.300"}
    px={{ base: "6", md: "6" }}
    py={{ base: "3", md: "3" }}
    borderRadius={{ base: "lg", md: "xl" }}
  >
    <Flex align={"flex-end"} justify={"center"}>
      <FormLabel htmlFor={label} w={"3rem"}>
        {label}
      </FormLabel>
      <NumberInput {...props} value={value} onChange={onChange} w={"7rem"}>
        <NumberInputField borderRightRadius={0} />
      </NumberInput>
      {options && (
        <Select
          w={"7rem"}
          bg={"blue.500"}
          color={"white"}
          variant={"filled"}
          defaultValue={options[0]}
          borderLeftRadius={0}
          _hover={{ bg: "blue.600" }}
          _focus={{ bg: "blue.600" }}
          onChange={(e) => onSelect(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option} className="text-black">
              {option}
            </option>
          ))}
        </Select>
      )}
    </Flex>
  </Box>
);

const ChemicalInputFields = ({ form, setForm }) => {
  const options = ["µS/cm", "mS/cm", "dS/m", "meq/L"];

  return (
    <Flex
      wrap={"wrap"}
      justify={{ base: "center", md: "center" }}
      align={"center"}
      gap={5}
      w={"100%"}
      mx={"auto"}
    >
      <InputField
        label="pH:"
        name="ph"
        value={form.ph.value}
        onChange={(valueString) => {
          setForm({ ...form, ph: { value: valueString, unit: form.ph.unit } });
        }}
      />
      <InputField
        label="EC:"
        name="ec"
        value={form.ec.value}
        onChange={(valueString) => {
          setForm({ ...form, ec: { value: valueString, unit: form.ec.unit } });
        }}
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, ec: { value: form.ec.value, unit: e } });
        }}
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
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, co3: { value: form.co3.value, unit: e } });
        }}
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
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, hco3: { value: form.hco3.value, unit: e } });
        }}
      />
      <InputField
        label="Cl:"
        name="cl"
        value={form.cl.value}
        onChange={(valueString) => {
          setForm({ ...form, cl: { value: valueString, unit: form.cl.unit } });
        }}
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, cl: { value: form.cl.value, unit: e } });
        }}
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
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, so4: { value: form.so4.value, unit: e } });
        }}
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
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, no3: { value: form.no3.value, unit: e } });
        }}
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
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, po4: { value: form.po4.value, unit: e } });
        }}
      />
      <InputField
        label="TH:"
        name="th"
        value={form.th.value}
        onChange={(valueString) => {
          setForm({ ...form, th: { value: valueString, unit: form.th.unit } });
        }}
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, th: { value: form.th.value, unit: e } });
        }}
      />
      <InputField
        label="Ca:"
        name="ca"
        value={form.ca.value}
        onChange={(valueString) => {
          setForm({ ...form, ca: { value: valueString, unit: form.ca.unit } });
        }}
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, ca: { value: form.ca.value, unit: e } });
        }}
      />
      <InputField
        label="Mg:"
        name="mg"
        value={form.mg.value}
        onChange={(valueString) => {
          setForm({ ...form, mg: { value: valueString, unit: form.mg.unit } });
        }}
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, mg: { value: form.mg.value, unit: e } });
        }}
      />
      <InputField
        label="Na:"
        name="na"
        value={form.na.value}
        onChange={(valueString) => {
          setForm({ ...form, na: { value: valueString, unit: form.na.unit } });
        }}
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, na: { value: form.na.value, unit: e } });
        }}
      />
      <InputField
        label="K:"
        name="k"
        value={form.k.value}
        onChange={(valueString) => {
          setForm({ ...form, k: { value: valueString, unit: form.k.unit } });
        }}
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, k: { value: form.k.value, unit: e } });
        }}
      />
      <InputField
        label="F:"
        name="f"
        value={form.f.value}
        onChange={(valueString) => {
          setForm({ ...form, f: { value: valueString, unit: form.f.unit } });
        }}
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, f: { value: form.f.value, unit: e } });
        }}
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
        options={options}
        onSelect={(e) => {
          console.log(e);
          setForm({ ...form, sio2: { value: form.sio2.value, unit: e } });
        }}
      />
    </Flex>
  );
};

export default ChemicalInputFields;
