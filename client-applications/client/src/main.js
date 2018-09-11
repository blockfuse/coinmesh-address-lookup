import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources('components/address-lookup');

  aurelia.start().then(() => aurelia.enhance());
}
