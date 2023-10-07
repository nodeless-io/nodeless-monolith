export const filterInvoicesByStatus = (invoices: any[]) =>
  invoices.filter((invoice) => invoice.status != "expired");
