package uz.gvs.admin_crm.entity.enums;

import java.util.List;

public enum WeekdayName {
    SUNDAY("Yak"), MONDAY("Dush"), TUESDAY("Sesh"), WEDNESDAY("Chor"), THURSDAY("Pay"), FRIDAY("Ju"), SATURDAY("Shan");
    public String name;

    WeekdayName(String name) {
        this.name = name;
    }
}
