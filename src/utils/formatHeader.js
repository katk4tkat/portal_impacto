function formatHeader(header) {
    let formattedHeader = header.toLowerCase();

    formattedHeader = formattedHeader
      .replace(/[áäâà]/g, 'a')
      .replace(/[éëêè]/g, 'e')
      .replace(/[íïîì]/g, 'i')
      .replace(/[óöôò]/g, 'o')
      .replace(/[úüûù]/g, 'u')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_');

    return formattedHeader;
  }

  export {formatHeader};