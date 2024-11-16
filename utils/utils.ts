export const calculateHousePayment = (monthlySavings: number, purchasePrice: number = 500000, yearlyInterest: {interest:number}[]) => {
    let downPaymentAmount = 0
    let differenceAmountInFive = 0;
    let surplusAmountInFive = 0;
    let differenceAmountInTen = 0;
    let surplusAmountInTen = 0;
    const totalSavings: number[] = [];

    if(purchasePrice <= 500000){
        downPaymentAmount = purchasePrice * 0.5;
    } else if (purchasePrice > 500000 && purchasePrice < 100000000) {
        let remainingAmountOfPurchasePrice = (purchasePrice - 500000) * 0.10;
        const purchasePriceSecondAmount = 500000 * 0.5;
        downPaymentAmount = remainingAmountOfPurchasePrice + purchasePriceSecondAmount;
    } else{
        downPaymentAmount = purchasePrice * 0.20;
    }

    // Take Yearly Amount Saved And Add Interest (Do it for each year seperately)
    let totalAmountInFiveYears = 0;
    let totalAmountInTenYears = 0;
    const calculateYearlyTotalSavings = () => {
        for (let index = 0; index < yearlyInterest.length; index++) {
            let totalYearlySavingsWithInterst = monthlySavings * 12 *  yearlyInterest[index].interest;
            if (index < 5) {
                totalAmountInFiveYears += totalYearlySavingsWithInterst;
            }
            
            if(index === 5){
                totalAmountInTenYears = totalAmountInFiveYears;
            }

            if(index >= 5 && index < 10){
                totalAmountInTenYears += totalYearlySavingsWithInterst;
            }

            totalSavings.push(totalYearlySavingsWithInterst)
        }
    }



    calculateYearlyTotalSavings()

    const calculateUserDownPaymentClearance = () => {
        // Check how much user would have in 5 years
        if(totalAmountInFiveYears >= downPaymentAmount){
            surplusAmountInFive = totalAmountInFiveYears - downPaymentAmount;
        } else {
            differenceAmountInFive = downPaymentAmount - totalAmountInFiveYears;
        }
    
        // Check how much user would have in 10 years
        if(totalAmountInTenYears >= downPaymentAmount){
            surplusAmountInTen = totalAmountInTenYears - downPaymentAmount;
        } else {
            differenceAmountInTen = downPaymentAmount - totalAmountInTenYears;        
        }
    }

    calculateUserDownPaymentClearance();

    return {totalSavings, totalAmountInFiveYears, totalAmountInTenYears, differenceAmountInFive, differenceAmountInTen,surplusAmountInFive, surplusAmountInTen}
}


