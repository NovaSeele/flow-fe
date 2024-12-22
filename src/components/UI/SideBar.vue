<script setup>
import { ref } from "vue";

const isShow = ref(true);
const activeSection = ref("Current");
const props = defineProps(['projectName']);
const emitter = defineEmits(['currentTab']);

const handleClick = (section) => {
  activeSection.value = section; 
  emitter('currentTab', section);
};
</script>

<template>
  <div class="sidebar-container">
    <div :class="['side-menu', { hidden: !isShow }]">
      <div class="div">
        <div>
          <div
            class="current"
            :class="{
              hovered: activeSection !== 'Current',
              selected: activeSection === 'Current',
            }"
            @click="handleClick('Current')"
          >
            <img src="./UI_icons/book.svg" alt="Book Icon" />
            <div class="text-wrapper">Current</div>
          </div>
        </div>

        <div>
          <div
            class="sprints"
            :class="{
              hovered: activeSection !== 'Sprints',
              selected: activeSection === 'Sprints',
            }"
            @click="handleClick('Sprints')"
          >
            <div class="div-2">
              <img src="./UI_icons/sprints.svg" alt="Sprints Icon" />
              <div class="text-wrapper-2">Sprints</div>
            </div>
          </div>
        </div>

        <div>
          <div
            class="div-wrapper"
            :class="{
              hovered: activeSection !== 'Issues',
              selected: activeSection === 'Issues',
            }"
            @click="handleClick('Issues')"
          >
            <div class="div-2">
              <img src="./UI_icons/issues.svg" alt="Issues Icon" />
              <div class="text-wrapper-3">Issues</div>
            </div>
          </div>
        </div>
      </div>

      <div class="div-3">
        <div>
          <div
            class="current"
            :class="{
              hovered: activeSection !== 'Members',
              selected: activeSection === 'Members',
            }"
            @click="handleClick('Members')"
          >
            <img src="./UI_icons/member.svg" alt="Member Icon" />
            <div class="text-wrapper">Members</div>
          </div>
        </div>
        <div>
          <div
            class="div-wrapper"
            :class="{
              hovered: activeSection !== 'Role & Access',
              selected: activeSection === 'Role & Access',
            }"
            @click="handleClick('Role & Access')"
          >
            <div class="div-2">
              <img src="./UI_icons/role.svg" alt="Role Icon" />
              <div class="text-wrapper">Role &amp; Access</div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="div-wrapper"
            :class="{
              hovered: activeSection !== 'Project Settings',
              selected: activeSection === 'Project Settings',
            }"
            @click="handleClick('Project Settings')"
          >
            <div class="div-2">
              <img src="./UI_icons/setting.svg" alt="Setting Icon" />
              <div class="text-wrapper">Project Settings</div>
            </div>
          </div>
        </div>
      </div>
      <div class="overview">
        <div class="div-2">
          <img src="./UI_icons/header.svg" alt="Setting Icon" />
          <div class="frame">
            <div class="overlap-group">
              <div class="text-wrapper-4">{{ projectName }}</div>
              <div class="text-wrapper-5">Project details</div>
            </div>
          </div>
        </div>
      </div>
      <div class="planning">PLANNING</div>
      <div class="settings">SETTINGS</div>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.div-active, .div-exact-active {
  text-decoration: none;
  color: inherit;
}
</style>


<style>
/* Existing styles */
.sidebar-container {
  position: relative;
  width: fit-content;
}

.toggle-button {
  position: absolute;
  right: 0;
  transform: translateX(50%);
  background: white;
  padding: 2px;
  border-radius: 50%;
  top: 30px;
  cursor: pointer;
  transition: transform 0.3s;
}

.side-menu {
  background-color: var(--primary-0);
  border-color: #00000042;
  border-right-style: solid;
  border-right-width: 1px;
  height: 960px;
  position: relative;
  width: 244px;
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  gap: 20px;
  overflow: hidden;
  border-right: 2px solid #d1d5db;
  transition: width 0.3s;
}

.side-menu .current,
.side-menu .sprints,
.side-menu .div-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.side-menu .current img,
.side-menu .sprints img,
.side-menu .div-wrapper img {
  width: 24px;
  height: 24px;
}

.side-menu .text-wrapper,
.side-menu .text-wrapper-2,
.side-menu .text-wrapper-3 {
  font-size: 14px;
  color: var(--secondary-300);
}

.side-menu .hovered:hover {
  background-color: #d0d0d0; /* Darker hover color */
}

.side-menu .selected {
  background-color: #d0d0d0; /* Darker selected color */
}

.side-menu .hovered:hover .text-wrapper,
.side-menu .hovered:hover .text-wrapper-2,
.side-menu .hovered:hover .text-wrapper-3 {
  color: #007bff; /* Text color on hover */
}
</style>

<style>
.sidebar-container {
  position: relative;
  width: fit-content;
}

.toggle-button {
  position: absolute;
  right: 0;
  transform: translateX(50%);
  background: white;
  padding: 2px;
  border-radius: 50%;
  top: 30px;
  cursor: pointer;
  transition: transform 0.3s;
}

.toggle-button img {
  width: 60px;
  height: 60px;
}

.toggle-button.rotated {
  transform: translateX(50%) rotate(180deg);
  padding-left: 3vh;
}

.side-menu {
  background-color: var(--primary-0);
  border-color: #00000042;
  border-right-style: solid;
  border-right-width: 1px;
  height: 960px;
  position: relative;
  width: 244px;

  display: flex;
  flex-direction: column;
  padding-top: 5px;
  gap: 20px;
  overflow: hidden;
  width: 244px;
  height: 100vh;
  border-right: 2px solid #d1d5db;
  transition: width 0.3s;
}

.side-menu.hidden {
  width: 0;
  margin-left: -100px;
}

.side-menu .div {
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  gap: 24px;
  left: 18px;
  position: absolute;
  top: 132px;
}

.side-menu .current {
  align-items: center;
  border-radius: 10px;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 12px;
  padding: 10px 20px;
  position: relative;
}

.side-menu .icon-instance-node {
  height: 24px !important;
  position: relative !important;
  width: 24px !important;
}

.side-menu .text-wrapper {
  color: var(--secondary-300);
  font-family: var(--semibold-type-14-font-family);
  font-size: var(--semibold-type-14-font-size);
  font-style: var(--semibold-type-14-font-style);
  font-weight: var(--semibold-type-14-font-weight);
  height: 24px;
  letter-spacing: var(--semibold-type-14-letter-spacing);
  line-height: var(--semibold-type-14-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: 112px;
}

.side-menu .div-2 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 12px;
  position: relative;
}

.side-menu .text-wrapper-2 {
  color: var(--secondary-900);
  font-family: var(--semibold-type-14-font-family);
  font-size: var(--semibold-type-14-font-size);
  font-style: var(--semibold-type-14-font-style);
  font-weight: var(--semibold-type-14-font-weight);
  height: 24px;
  letter-spacing: var(--semibold-type-14-letter-spacing);
  line-height: var(--semibold-type-14-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: 112px;
}

.side-menu .div-wrapper {
  align-items: flex-start;
  border-radius: 10px;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
  position: relative;
}

.side-menu .text-wrapper-3 {
  color: var(--secondary-300);
  font-family: var(--semibold-type-14-font-family);
  font-size: var(--semibold-type-14-font-size);
  font-style: var(--semibold-type-14-font-style);
  font-weight: var(--semibold-type-14-font-weight);
  height: 20px;
  letter-spacing: var(--semibold-type-14-letter-spacing);
  line-height: var(--semibold-type-14-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: 112px;
}

.side-menu .div-3 {
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  gap: 24px;
  left: 18px;
  position: absolute;
  top: 370px;
}

.side-menu .image {
  height: 25.68px;
  object-fit: cover;
  position: relative;
  width: 20px;
}

.side-menu .frame {
  height: 33px;
  position: relative;
  width: 119px;
}

.side-menu .overlap-group {
  height: 33px;
  position: relative;
  top: -5px;
  width: 89px;
}

.side-menu .text-wrapper-4 {
  color: var(--secondary-300);
  font-family: var(--semibold-type-14-font-family);
  font-size: var(--semibold-type-14-font-size);
  font-style: var(--semibold-type-14-font-style);
  font-weight: var(--semibold-type-14-font-weight);
  height: 21px;
  left: 0;
  letter-spacing: var(--semibold-type-14-letter-spacing);
  line-height: var(--semibold-type-14-line-height);
  position: absolute;
  top: 0;
  white-space: nowrap;
}

.side-menu .text-wrapper-5 {
  color: var(--secondary-300);
  font-family: "Plus Jakarta Sans-SemiBold", Helvetica;
  font-size: 9px;
  font-weight: 600;
  height: 14px;
  left: 0;
  letter-spacing: -0.18px;
  line-height: 13.5px;
  position: absolute;
  top: 19px;
  white-space: nowrap;
}

.side-menu .planning {
  color: #000000;
  font-family: "Plus Jakarta Sans-SemiBold", Helvetica;
  font-size: 12px;
  font-weight: 600;
  height: 18px;
  left: 28px;
  letter-spacing: -0.24px;
  line-height: 18px;
  position: absolute;
  top: 93px;
  white-space: nowrap;
}

.side-menu .settings {
  color: #000000;
  font-family: "Plus Jakarta Sans-SemiBold", Helvetica;
  font-size: 12px;
  font-weight: 600;
  height: 18px;
  left: 24px;
  letter-spacing: -0.24px;
  line-height: 18px;
  position: absolute;
  top: 331px;
  white-space: nowrap;
}
</style>
