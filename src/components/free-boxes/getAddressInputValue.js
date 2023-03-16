const addressParts = {
  free_boxes_address: ['street_number', 'route'],
  free_boxes_apt: ['subpremise', 'premise'],
  free_boxes_city: [
    'locality',
    'postal_town',
    'administrative_area_level_2',
    'administrative_area_level_3',
  ],
  free_boxes_state: [
    'administrative_area_level_1',
    'administrative_area_level_2',
  ],
  free_boxes_zip: ['postal_code', 'postal_code_suffix'],
};

export default (partId, ref, address, clearErrors, setValue) => {
  const addressKey = partId.replaceAll('-', '_');

  const curAddressPartTypes = addressParts[addressKey];

  const existingParts = [];

  curAddressPartTypes.forEach((addressPart) => {
    const existingPart = address.find((component) =>
      component.types.includes(addressPart)
    );
    if (existingPart) existingParts.push(existingPart);
  });

  let addressPartFinal = existingParts[0]?.long_name ?? '';

  if (partId === 'free-boxes-address') {
    addressPartFinal = `${existingParts[0]?.long_name ?? ''} ${
      existingParts[1]?.long_name ?? ''
    }`;
  }

  const idSplit = partId.split('-');

  const regId = `${idSplit[1]}${idSplit[2][0].toUpperCase()}${idSplit[2].slice(
    1
  )}`;

  setValue(regId, addressPartFinal);
  ref.current.value = addressPartFinal;
  if (addressPartFinal) clearErrors(regId);
};
