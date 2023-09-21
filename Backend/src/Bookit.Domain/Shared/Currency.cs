namespace Bookit.Domain.Apartments;

    public record Currency
    {
        internal static readonly Currency None = new("");
        public static readonly Currency Ils = new("₪");
        public static readonly Currency Usd = new("$");
        public static readonly Currency Eur = new("€");

        private Currency(string code) => Code = code;

        public string Code { get; init; }

        public static Currency FromCode(string code) =>
            All.FirstOrDefault(c => c.Code == code)
            ?? throw new ApplicationException($"Currency {code} is not supported");

        public static readonly IReadOnlyCollection<Currency> All = new[] { Ils, Usd, Eur };
    }